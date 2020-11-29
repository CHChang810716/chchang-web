#pragma once
#include <boost/dll/runtime_symbol_info.hpp>
#include <boost/filesystem.hpp>

namespace avalon::app {

constexpr auto bin_dir = []() {
  return boost::dll::program_location().parent_path();
};

constexpr auto install_dir = []() {
  return bin_dir().parent_path();
};

constexpr auto test_data_dir = []() {
  return install_dir() / "test" / "data";
};

}