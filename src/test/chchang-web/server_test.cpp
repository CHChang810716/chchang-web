#include <chchang-web/server.h>
#include <thread>
#include <pixiu/client.hpp>
#include <iostream>
using namespace chchang_web;
int main() {
  std::thread serv_worker([](){ run_server(8080, true, 20); });
  boost::asio::io_context ioc;
  auto client = pixiu::make_client(ioc);
  boost::asio::steady_timer serv_ready(ioc, std::chrono::seconds(5));
  boost::asio::spawn(ioc, [&](auto yield){
    serv_ready.async_wait(yield);
    std::string cookie_str;
    {
      auto reps = client.async_read(
        "localhost", "8080", 11, {
          {"/api/v1/register", http::verb::post}
        },
        [](auto&& req) {
          nlohmann::json form({
            {"email", "xxx@mail.com"},
            {"passwd", "qsefth"}
          });
          auto str = form.dump();
          req.body() = str;
          req.set(http::field::content_length, str.size());
        },
        yield
      );
      std::cout << reps.at(0) << '\n';
      auto body_str = buffers_to_string(reps.at(0).body().data());
      auto rep_json = nlohmann::json::parse(body_str);
      assert(rep_json["err_code"].template get<int>() == 0);
    }
    {
      auto reps = client.async_read(
        "localhost", "8080", 11, {
          {"/api/v1/login", http::verb::post}
        },
        [](auto&& req) {
          nlohmann::json form({
            {"email", "ooo@mail.com"},
            {"passwd", "qsefth"}
          });
          auto str = form.dump();
          req.body() = str;
          req.set(http::field::content_length, str.size());
        },
        yield
      );
      std::cout << reps.at(0) << '\n';
      auto body_str = buffers_to_string(reps.at(0).body().data());
      auto rep_json = nlohmann::json::parse(body_str);
      assert(rep_json["err_code"].template get<int>() != 0);
    }
    {
      auto reps = client.async_read(
        "localhost", "8080", 11, {
          {"/api/v1/login", http::verb::post}
        },
        [](auto&& req) {
          nlohmann::json form({
            {"email", "xxx@mail.com"},
            {"passwd", "qsefth"}
          });
          auto str = form.dump();
          req.body() = str;
          req.set(http::field::content_length, str.size());
        },
        yield
      );
      std::cout << reps.at(0) << '\n';
      auto body_str = buffers_to_string(reps.at(0).body().data());
      auto rep_json = nlohmann::json::parse(body_str);
      assert(rep_json["err_code"].template get<int>() == 0);
    }
  });
  ioc.run();
  serv_worker.join();
}