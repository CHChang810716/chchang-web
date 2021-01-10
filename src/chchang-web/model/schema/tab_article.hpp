#pragma once
#include <string_view>

#include <sqlpp17/data_types.h>
#include <sqlpp17/name_tag.h>
#include <sqlpp17/table.h>

namespace chchang_web::model::schema {

struct TabArticle : public ::sqlpp::spec_base
{
  SQLPP_NAME_TAGS_FOR_SQL_AND_CPP(TabArticle, tabArticle);

  struct Id : public ::sqlpp::spec_base
  {
    SQLPP_NAME_TAGS_FOR_SQL_AND_CPP(id, id);
    using value_type = std::int64_t;
    static constexpr auto can_be_null = false;
    static constexpr auto has_default_value = false;
    static constexpr auto has_auto_increment = true;
  };

  struct Title : public ::sqlpp::spec_base
  {
    SQLPP_NAME_TAGS_FOR_SQL_AND_CPP(title, title);
    using value_type = ::sqlpp::varchar<255>;
    static constexpr auto can_be_null = false;
    static constexpr auto has_auto_increment = false;
    static constexpr auto has_default_value = true;
    static constexpr auto default_value = std::string_view("(untitled)");
  };

  struct Auther : public ::sqlpp::spec_base
  {
    SQLPP_NAME_TAGS_FOR_SQL_AND_CPP(auther, auther);
    using value_type = std::int64_t;
    static constexpr auto can_be_null = false;
    static constexpr auto has_default_value = false;
    static constexpr auto has_auto_increment = false;
  };

  struct Content : public ::sqlpp::spec_base
  {
    SQLPP_NAME_TAGS_FOR_SQL_AND_CPP(content, content);
    using value_type = ::sqlpp::text;
    static constexpr auto can_be_null = false;
    static constexpr auto has_auto_increment = false;
    static constexpr auto has_default_value = true;
    static constexpr auto default_value = std::string_view("");
  };

  using _columns = ::sqlpp::type_vector<Id, Title, Auther, Content>;

  using primary_key = sqlpp::type_vector<Id>;
};
constexpr auto tabArticle = sqlpp::table_t<TabArticle>{};

}