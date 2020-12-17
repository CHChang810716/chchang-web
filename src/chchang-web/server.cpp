#include <pixiu/server.hpp>
#include <pixiu/response.hpp>
#include <avalon/app/path.hpp>
#include <nlohmann/json.hpp>
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

int main(int argc, char* argv[]) {
  pixiu::logger::config(avalon::app::install_dir() / "etc" / "config.json");
  /**
   * make a http server and listen to 8080 port
   */
  auto server = pixiu::make_server();
  server.get("/", [](const auto& req) {
    return get_static("index.html");
  });
  server.get("/api/v1/hello_world", [](const auto& req) {
    return pixiu::make_response("hello world");
  });
  server
    .get("/api/v1/devlog/index", [](const auto& req) {
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
      [](const auto& req, const std::string& name){
        auto article_path = avalon::app::install_dir() 
          / "devlog" 
          / fmt::format("{}.md", name)
        ;
        logger().debug("get devlog article: {}", article_path.string());
        return pixiu::make_response(article_path);
      }
    )
    .get("/.+", [](const auto& req) {
      return get_static(req.target().substr(1).to_string());
    })
    .listen("0.0.0.0", std::atoi(argv[1]))
    .run();
}