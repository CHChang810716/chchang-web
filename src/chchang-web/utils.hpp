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

}