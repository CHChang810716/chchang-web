#pragma once
#include "utils.h"

namespace chchang_web::api::v1 {

constexpr struct {
  auto& logger() const {
    return pixiu::logger::get("userinfo");
  }
  template<class Ctx, class Client>
  auto impl(const Ctx& ctx, Client& https_client) const {
    namespace http = boost::beast::http;
    auto& sn = ctx.session();
    if(!sn.is_login()) {
      throw std::runtime_error("user not login");
    }
    if(!sn.email.empty()) {
      return nlohmann::json({
        {"email", sn.email},
        {"name",  sn.name}
      });
    }
    auto& gauth = sn.google_auth;
    boost::system::error_code ec;
    auto rep = https_client.async_read(
      GOOGLE_API_URI, "443", 11, {
        {GOOGLE_USERINFO_PROFILE, http::verb::get}
      },
      [&](auto& req) {
        req.set(
          http::field::authorization, 
          fmt::format(
            "Bearer {}", 
            gauth["access_token"].template get<std::string>()
          )
        );
      },
      ctx.get_yield_ctx()[ec]
    );
    pixiu::error_code_throw(ec);
    logger().debug("google user info: {}", pixiu::msg_to_string(rep.at(0)));
    auto guserinfo_str  = boost::beast::buffers_to_string(rep.at(0).body().data());
    auto guserinfo      = nlohmann::json::parse(guserinfo_str);
    nlohmann::json info {
      {"email", guserinfo["email"]},
      {"name", guserinfo["name"]}
    };
    return info;
  }

  template<class Ctx, class Client>
  auto operator()(const Ctx& ctx, Client& https_client) const {
    nlohmann::json res;
    try {
      res = impl(ctx, https_client);
    } catch(const std::exception& e) {
      res["err_msg"] = e.what();
    }
    return pixiu::make_response(res.dump());
  }
} userinfo;

}