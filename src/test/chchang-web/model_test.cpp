#include <chchang-web/model.h>
#include <cassert>
int main() {
  chchang_web::init_db(true);
  chchang_web::add_user("qquser@email.com", "qqpassword@@");
  assert(chchang_web::verify_user("qquser@email.com", "qqpassword@@"));
  chchang_web::add_article("qquser@email.com", "mytitle0", "# mytitle0\n\nmy content");
  chchang_web::add_article("qquser@email.com", "mytitle1", "# mytitle1\n\nmy content");
  chchang_web::add_article("qquser@email.com", "mytitle2", "# mytitle2\n\nmy content");
  auto titles = chchang_web::get_article_index("qquser@email.com");
  assert(titles.size() == 3);
  assert(std::get<1>(titles[0]) == "mytitle0");
  assert(std::get<1>(titles[1]) == "mytitle1");
  assert(std::get<1>(titles[2]) == "mytitle2");
  std::cout << "test pass" << std::endl;
  return 0;
}