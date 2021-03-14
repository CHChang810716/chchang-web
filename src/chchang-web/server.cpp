#include "server.h"
using namespace chchang_web;
int main(int argc, char* argv[]) {
  if(argc < 2) {
    logger().error("chchang-web-server <port> [drop table(1/0)]");
    return 1;
  }
  run_server(
    std::atoi(argv[1]), 
    argc >= 3 && 
      (strcmp(argv[2], "1") == 0)
  );
}