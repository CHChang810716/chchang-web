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
static auto get_static(const std::string& from_shared) {
  auto pathfs = avalon::app::install_dir() / "share" / from_shared;
  auto rep = pixiu::make_response(pathfs);
  rep.apply([&pathfs](auto&& frep){
    frep.set(http::field::content_type, mime_type(pathfs.string()));
  });
  return rep;
}
int main(int argc, char* argv[]) {
  pixiu::logger::config(avalon::app::install_dir() / "etc" / "config.json");
  /**
   * make a http server and listen to 8080 port
   */
  auto server = pixiu::make_server();
  server.get("/hello_world", [](const auto& req) {
    return pixiu::make_response("hello world");
  });
  server.get("/static/.+", [](const auto& req) {
    return get_static(req.target().substr(8).to_string());
  });
  server.get("/", [](const auto& req) {
    return get_static("index.html");
  });
  server.listen("0.0.0.0", std::atoi(argv[1]));

  server.run();
}