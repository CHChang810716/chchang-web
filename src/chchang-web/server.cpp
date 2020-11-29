#include <pixiu/server.hpp>
#include <pixiu/response.hpp>
#include <avalon/app/path.hpp>
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
int main(int argc, char* argv[]) {
  pixiu::logger::config(avalon::app::install_dir() / "etc" / "config.json");
  /**
   * make a http server and listen to 8080 port
   */
  auto server = pixiu::make_server();
  server.get("/", [](const auto& req) -> pixiu::server_bits::response {
    pixiu::logger::get("app").debug("root target: {}", req.target().to_string());
    http::response<http::string_body> rep;
    rep.body() = "hello world";
    return pixiu::server_bits::response(rep);
  });
  server.get("/static/.+", [](const auto& req) -> pixiu::server_bits::response {
    pixiu::logger::get("app").debug("static target: {}", req.target().to_string());
    auto pathfs = avalon::app::install_dir() / "share" / req.target().substr(8).to_string();
    auto path = pathfs.string();
    boost::beast::error_code ec;
    http::file_body::value_type body;
    body.open(
      path.c_str(), 
      boost::beast::file_mode::scan, 
      ec
    );
    if(ec) {
      throw pixiu::server_bits::error::server_error(ec.message());
    }
    const auto fsize = body.size();
    http::response<http::file_body> rep {
      std::piecewise_construct,
      std::make_tuple(std::move(body)),
      std::make_tuple(http::status::ok, req.version())
    };
    rep.set(http::field::content_type, mime_type(path));
    rep.content_length(fsize);
    return pixiu::server_bits::response(std::move(rep));
  });
  server.listen("0.0.0.0", std::atoi(argv[1]));
  server.run();
}