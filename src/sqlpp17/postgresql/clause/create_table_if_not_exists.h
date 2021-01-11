#pragma once

/*
Copyright (c) 2017 - 2019, Roland Bock
All rights reserved.

Redistribution and use in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice, this
   list of conditions and the following disclaimer in the documentation and/or
   other materials provided with the distribution.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR
ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON
ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

#include <string>

#include <sqlpp17/clause/create_table_if_not_exists.h>
#include <sqlpp17/column.h>
#include <sqlpp17/data_types.h>
#include <sqlpp17/table.h>
#include <sqlpp17/type_vector_to_sql_name.h>

#include <sqlpp17/postgresql/context.h>
#include <sqlpp17/postgresql/value_type_to_sql_string.h>

#include <sqlpp17/utils.h>
#include <sqlpp17/postgresql/clause/create_table.h>

namespace sqlpp
{
  template <typename Table, typename Statement>
  [[nodiscard]] auto to_sql_string(postgresql::context_t& context,
                                   const clause_base<create_table_if_not_exists_t<Table>, Statement>& t)
  {
    auto ret = std::string{"CREATE TABLE IF NOT EXISTS "} + to_sql_string(context, t._table);
    ret += "(";
    ret += ::sqlpp::postgresql::detail::to_sql_create_columns_string(context, column_tuple_of(t._table));
    ret += ::sqlpp::postgresql::detail::to_sql_primary_key(context, t._table);
    ret += ")";

    return ret;
  }
}  // namespace sqlpp
