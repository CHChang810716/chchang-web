#include <chchang-web/server.h>
#include <thread>
#include <pixiu/client.hpp>

int main() {
  std::thread serv_worker([](){ run_server(8080); });
  boost::asio::io_context ioc;
  auto client = pixiu::make_client(ioc);
  boost::asio::steady_timer serv_ready(ioc, std::chrono::seconds(5));
  boost::asio::spawn(ioc, [&](auto yield){
    serv_ready.async_wait(yield);
    std::string cookie_str;
    client.async_read(
      "localhost", "8080", 11, {
        {"/api/v1/login", http::verb::post}
      },
      [](auto&& req) {

      },
      yield
    );
  });
  ioc.run();
  serv_worker.join();
}