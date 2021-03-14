#pragma once
#include <sqlpp17/postgresql/text_type_to_sql_string.h>

#include "model/config.hpp"
#include "model/schema/tab_user.hpp"
#include "model/schema/tab_article.hpp"
#include <sqlpp17/postgresql/clause/create_table_if_not_exists.h>
#include <sqlpp17/clause/select.h>
#include <sqlpp17/clause/insert_into.h>
#include <bcrypt/BCrypt.hpp>
#include <fmt/format.h>
#include <sqlpp17/clause/drop_table.h>
#include <chchang-web/utils.hpp>

#include <pixiu/logger.hpp>

namespace chchang_web {

namespace model {
auto& logger() {
  return pixiu::logger::get("model");
}
}

struct UserNotFound : public std::runtime_error {
  UserNotFound() : std::runtime_error("user not found") {}
};
struct BugUserCannotCreate : public std::runtime_error {
  BugUserCannotCreate(const std::string& reason)
  : std::runtime_error(
    fmt::format("Bug: user cannot create, reason: {}", reason)
  )
  {}
  BugUserCannotCreate()
  : std::runtime_error("Bug: user cannot create")
  {}
};

constexpr int encrypt_workload = 12; // this factor affects the time of encryption.
constexpr auto get_db = []() -> auto& {
  static sqlpp::postgresql::connection_t<> db{ model::get_db_config() };
  return db;
};

constexpr auto init_db = [](bool drop_tables = false) -> auto& {
  using model::schema::tabUser;
  using model::schema::tabArticle;
  auto& db = get_db();
  if(drop_tables) {
    db(sqlpp::drop_table(tabUser));
    db(sqlpp::drop_table(tabArticle));
  }
  db(sqlpp::create_table_if_not_exists(tabUser));
  db(sqlpp::create_table_if_not_exists(tabArticle));
  return db;
};

struct EmailUsed : public std::runtime_error {
  EmailUsed() : std::runtime_error("email has been used") {}
};
constexpr auto get_user = [](
  const std::string_view& email
) -> std::int64_t {
  using model::schema::tabUser;
  auto& db = get_db();
  for(const auto& row : db(sqlpp::select(tabUser.id)
    .from(tabUser)
    .where(tabUser.email == email)
  )) {
    return row.id;
  }
  throw UserNotFound();
};

constexpr auto add_user_get_id = [](
  const std::string_view& email
) -> std::int64_t {
  using model::schema::tabUser;
  auto& db = get_db();
  bool email_used = false;
  for(const auto& row : db(sqlpp::select(tabUser.email)
    .from(tabUser)
    .where(tabUser.email == email)
  )) {
    email_used = true;
    break; 
  }
  if(email_used) {
    model::logger().error("email used");
    throw EmailUsed();
  } else {
    // going to insert user
    db(sqlpp::insert_into(tabUser).set(
      tabUser.email = email
    ));
    return get_user(email);
  }
};

constexpr auto add_user = [](
  const std::string_view& email
) -> bool {
  try {
    add_user_get_id(email);
    return true;
  } catch (const EmailUsed& e) {
    return false;
  }
};

constexpr auto get_or_insert_user = [](
  const std::string_view& email
) -> std::int64_t {
  try {
    return get_user(email);
  } catch(const UserNotFound& e) {
    return add_user_get_id(email);
  }
};

constexpr auto add_article = [](
  const std::int64_t&     user_id,
  const std::string_view& title,
  const std::string_view& content
) {
  using model::schema::tabUser;
  using model::schema::tabArticle;
  auto now = to_timestamp(std::chrono::system_clock::now());
  auto& db = get_db();
  return db(sqlpp::insert_into(tabArticle)
    .set(
      tabArticle.auther = user_id,
      tabArticle.title = title,
      tabArticle.content = content,
      tabArticle.create_date = (std::int64_t)now,
      tabArticle.update_date = (std::int64_t)now
    )
  );
};

constexpr auto get_article_index = [](
  const std::int64_t& user_id
) {
  using model::schema::tabUser;
  using model::schema::tabArticle;
  using Entry = std::tuple<std::int64_t, std::string>;
  auto& db = get_db();
  std::vector<Entry> result;
  for(const auto& article : db(sqlpp::select(
      tabArticle.id,
      tabArticle.title
    )
    .from(tabArticle).where(
      tabArticle.auther == user_id
    )
  )) {
    auto& title = article.title;
    result.emplace_back(article.id, std::string(title.data(), title.length()));
  }
  return result;
};

constexpr auto get_article = [](
  const std::int64_t& user_id,
  const std::int64_t& article_id
) {
  using model::schema::tabUser;
  using model::schema::tabArticle;

  auto& db = get_db();
  for(const auto& article : db(sqlpp::select(
      tabArticle.content
    )
    .from(tabArticle)
    .where(
      tabArticle.id == article_id &&
      tabArticle.auther == user_id
    )
  )) {
    return article.content;
  }
  throw std::runtime_error("article not found");
};
  

}