#pragma once
#include <chrono>
namespace chchang_web {

template<class Clock, class Duration>
std::uint64_t to_timestamp(
  const std::chrono::time_point<Clock, Duration>& tp
) {
  auto du = std::chrono::duration_cast<std::chrono::milliseconds>(
    tp.time_since_epoch()
  );
  return du.count();
}
std::string get_env(const char* name) {
  if(const char* var = std::getenv(name); var) {
    return std::string(var);
  } else {
    throw std::runtime_error(fmt::format("env: {} not found", name));
  }
}

}