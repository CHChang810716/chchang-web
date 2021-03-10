#pragma once
#include <pixiu/server.hpp>
#include <pixiu/response.hpp>
#include <avalon/app/path.hpp>
#include <nlohmann/json.hpp>
#include <pixiu/request_router.hpp>
#include <chchang-web/model.h>
#include <pixiu/gauth.hpp>

using namespace boost::beast;

std::string mime_type(boost::beast::string_view path)
{
  using boost::beast::iequals;
  auto const ext = [&path]
  {
      auto const pos = path.rfind(".");
      if(pos == boost::beast::string_view::npos)
          return boost::beast::string_view{};
      return path.substr(pos);
  }();
  if(iequals(ext, ".htm"))  return "text/html";
  if(iequals(ext, ".html")) return "text/html";
  if(iequals(ext, ".php"))  return "text/html";
  if(iequals(ext, ".css"))  return "text/css";
  if(iequals(ext, ".txt"))  return "text/plain";
  if(iequals(ext, ".js"))   return "application/javascript";
  if(iequals(ext, ".json")) return "application/json";
  if(iequals(ext, ".xml"))  return "application/xml";
  if(iequals(ext, ".swf"))  return "application/x-shockwave-flash";
  if(iequals(ext, ".flv"))  return "video/x-flv";
  if(iequals(ext, ".png"))  return "image/png";
  if(iequals(ext, ".jpe"))  return "image/jpeg";
  if(iequals(ext, ".jpeg")) return "image/jpeg";
  if(iequals(ext, ".jpg"))  return "image/jpeg";
  if(iequals(ext, ".gif"))  return "image/gif";
  if(iequals(ext, ".bmp"))  return "image/bmp";
  if(iequals(ext, ".ico"))  return "image/vnd.microsoft.icon";
  if(iequals(ext, ".tiff")) return "image/tiff";
  if(iequals(ext, ".tif"))  return "image/tiff";
  if(iequals(ext, ".svg"))  return "image/svg+xml";
  if(iequals(ext, ".svgz")) return "image/svg+xml";
  return "application/text";
}
static auto get_static(const std::string& from_shared) {
  auto pathfs = avalon::app::install_dir() / "share" / from_shared;
  if(!boost::filesystem::exists(pathfs)) {
    throw pixiu::server_bits::error::target_not_found(from_shared);
  }
  auto rep = pixiu::make_response(pathfs);
  rep.apply([&pathfs](auto&& frep){
    frep.set(http::field::content_type, mime_type(pathfs.string()));
  });
  return rep;
}
auto& logger() {
  return pixiu::logger::get("app");
}

template<class... T>
using params = pixiu::server_bits::params<T...>;

struct session {
  bool            is_login  {false};
  std::int64_t    user_id   {-1};
  nlohmann::json  google_auth;
};
std::string get_env(const char* name) {
  if(const char* var = std::getenv(name); var) {
    return std::string(var);
  } else {
    throw std::runtime_error(fmt::format("env: {} not found", name));
  }
}

void run_server(int port, bool drop_table = false, int run_secs = -1) {
  pixiu::logger::config(avalon::app::install_dir() / "etc" / "config.json");
  pixiu::gauth_gconfig gauth_cfg {
    get_env("GOOGLE_CLIENT_ID"),
    get_env("GOOGLE_AUTH_URI"),
    get_env("GOOGLE_TOKEN_URI"),
    get_env("GOOGLE_CLIENT_SECRET")
  };
  /**
   * make a http server and listen to 8080 port
   */
  boost::asio::io_context ioc;
  chchang_web::init_db(drop_table);
  pixiu::request_router<session> router;
  auto server = pixiu::make_server(ioc, router);
  server.get("/", [](const auto& ctx) {
    return get_static("index.html");
  });
  server.get("/api/v1/hello_world", [](const auto& ctx) {
    return pixiu::make_response("hello world");
  });
  server
    .post("/api/v1/login", 
      params<std::string, std::string>("email", "passwd"),  
      [](auto& ctx, const std::string& email, const std::string& passwd) {
        auto& sesn = ctx.session();
        if(sesn.is_login) {
          return pixiu::make_response(nlohmann::json({
            {"err_code", 0},
            {"msg", "have logined in"}
          }));
        }
        try {
          auto user_id = chchang_web::verify_user(email, passwd);
          sesn.is_login = true;
          sesn.user_id = user_id;
          return pixiu::make_response(nlohmann::json({
            {"err_code", 0},
            {"msg", "login success"}
          }));
        } catch(const std::exception& e) {
          return pixiu::make_response(nlohmann::json({
            {"err_code", 1},
            {"msg", e.what()}
          }));
        }
      }
    )
    .post("/api/v1/register", 
      params<std::string, std::string>("email", "passwd"),  
      [](auto& ctx, const std::string& email, const std::string& passwd) {
        auto& sesn = ctx.session();
        try {
          if(!chchang_web::add_user(email, passwd)) {
            return pixiu::make_response(nlohmann::json({
              {"err_code", 1},
              {"msg", "unable to create user, user may exist or user name invalid"}
            }));
          }
          sesn.is_login = false;
          return pixiu::make_response(nlohmann::json({
            {"err_code", 0},
            {"msg", "register success"}
          }));
        } catch(const std::exception& e) {
          return pixiu::make_response(nlohmann::json({
            {"err_code", 1},
            {"msg", e.what()}
          }));
        }
      }
    )
    .get("/api/v1/devlog/index", [](const auto& ctx) {
      nlohmann::json index = std::vector<std::string>();
      auto devlogfs = avalon::app::install_dir() / "devlog";
      logger().debug("get index: {}", devlogfs.string());
      boost::filesystem::directory_iterator end_iter;
      for(boost::filesystem::directory_iterator iter (devlogfs); iter != end_iter; ++iter) {
        auto curr_path = iter->path();
        logger().debug("current scan: {}", curr_path.string());
        if(boost::filesystem::is_regular_file(curr_path)) {
          auto curr_name = curr_path.stem();
          index.push_back(curr_name.string());
        }
      }
      return pixiu::make_response(index.dump());
    })
    .get("/api/v1/devlog/article", params<std::string>("name"),
      [](const auto& ctx, const std::string& name){
        auto article_path = avalon::app::install_dir() 
          / "devlog" 
          / fmt::format("{}.md", name)
        ;
        logger().debug("get devlog article: {}", article_path.string());
        return pixiu::make_response(article_path);
      }
    )
    .get("/api/v1/gauth", pixiu::gauth_gconfig::params(),
      [&ioc, &gauth_cfg](const auto& ctx, const auto& code) {
        auto gauth = pixiu::make_gauth(ioc, gauth_cfg,
          get_env("HOST_URI"), {
            "openid"
          }
        );
        return gauth.callback(ctx, code);
      }
    )
    .get("/.+", [](const auto& ctx) {
      return get_static(std::to_string(ctx.req.target().substr(1)));
    })
    .listen("0.0.0.0", port);
  if(run_secs <= 0) {
    server.run();
  } else {
    server.run_for(std::chrono::seconds(run_secs));
  }
}