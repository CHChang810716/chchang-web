#pragma once
#include "utils.h"
#include <pixiu/gauth.hpp>
#include <chchang-web/utils.hpp>
#include "userinfo.hpp"

namespace chchang_web::api::v1 {

constexpr struct {
  using ggconfig = pixiu::gauth_gconfig;
  auto& logger() const {
    return pixiu::logger::get("gauth");
  }
  template<class IOC, class Client, class Ctx, class Code>
  auto operator()(
    const Ctx&      ctx,
    const Code&     code,
    IOC&            ioc, 
    Client&         https_client,
    const ggconfig& gauth_cfg
  ) const {
    auto gauth = pixiu::make_gauth(ioc, gauth_cfg,
      fmt::format("{}api/v1/gauth", get_env("HOST_URI")), {
        "openid",
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/userinfo.profile"
      }
    );
    auto now = std::chrono::system_clock::now();
    auto redirect = gauth.callback(ctx, code);
    if(auto& session = ctx.session(); !session.google_auth.empty()) {
      logger().debug("google auth: {}", session.google_auth.dump(2));
      session.google_auth_expire_time = 
        now + std::chrono::seconds(
          session.google_auth["expires_in"].template get<int>()
        )
      ;
      session.primary = true;
      logger().info("primary session: {}", ctx.session_id());

      auto uinfo = userinfo.impl(ctx, https_client);
      std::string uemail = uinfo["email"];
      auto uid = get_or_insert_user(uemail);
      session.user_id = uid;
      session.email   = uemail;
      session.name    = uinfo["name"];
      logger().debug("session.user_id: {}", session.user_id );
      logger().debug("session.email:   {}", session.email   );
      logger().debug("session.name:    {}", session.name    );
    }
    return redirect;
  }
} gauth;

}