#pragma once
#include "model/config.hpp"
#include "model/schema/tab_user.hpp"
#include "model/schema/tab_article.hpp"
#include <sqlpp17/postgresql/clause/create_table_if_not_exists.h>
namespace chchang_web {

constexpr auto get_db = []() -> auto& {
    static sqlpp::postgresql::connection_t<> db{ model::get_db_config() };
    return db;
};

constexpr auto init_db = []() -> auto& {
    auto& db = get_db();
    db(sqlpp::create_table_if_not_exists(model::schema::tabPerson));
    db(sqlpp::create_table_if_not_exists(model::schema::tabArticle));
    return db;
};

constexpr auto add_user = [](const std::string& name) ->

}