#include "server.h"
int main(int argc, char* argv[]) {
  if(argc < 2) {
    logger().error("chchang-web-server [port]");
    return 1;
  }
  run_server(std::atoi(argv[1]));
}