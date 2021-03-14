#include <chchang-web/model.h>
#include <cassert>
int main() {
  chchang_web::init_db(true);
  chchang_web::add_user("qquser@email.com");
  auto uid = chchang_web::get_user("qquser@email.com");
  assert(uid >= 0);
  chchang_web::add_article(uid, "mytitle0", "# mytitle0\n\nmy content");
  chchang_web::add_article(uid, "mytitle1", "# mytitle1\n\nmy content");
  chchang_web::add_article(uid, "mytitle2", "# mytitle2\n\nmy content");
  auto titles = chchang_web::get_article_index(uid);
  assert(titles.size() == 3);
  assert(std::get<1>(titles[0]) == "mytitle0");
  assert(std::get<1>(titles[1]) == "mytitle1");
  assert(std::get<1>(titles[2]) == "mytitle2");
  chchang_web::get_article(uid, std::get<0>(titles[0]));
  chchang_web::get_article(uid, std::get<0>(titles[1]));
  chchang_web::get_article(uid, std::get<0>(titles[2]));
  std::cout << "test pass" << std::endl;
  return 0;
}