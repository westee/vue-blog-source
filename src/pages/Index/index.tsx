import {defineComponent, onMounted, ref, getCurrentInstance} from 'vue';
import {RouterLink, useRouter} from 'vue-router'
import apiBlog from '@/api/blog'
import './template.less'

export default defineComponent({
  name: '首页',
  setup: () => {
    const page = ref(1);
    const total = ref(0);
    const blogs = ref<Blog[]>([]);
    onMounted(async () => {
      const res = await apiBlog.getBlogs({page: page.value})
      if (res.status == "ok") {
        blogs.value.push(...res.data)
      }
    })
    const {proxy}: any = getCurrentInstance()

    var router = useRouter();
    const onPageChange = (newPage: number) => {

      apiBlog.getIndexBlogs({page: newPage}).then((res: any) => {
        blogs.value.push(...res.data)
        total.value = res.total
        page.value = res.page
        router.push({path: '/', query: {page: newPage}})
      })
    }

    return () => (
      <div id="index">
        <div>
          <section class="blog-posts">
            {blogs.value.length != 0 && blogs.value.map((blog, index) => (
                <RouterLink class="item" key={blog.id} to={`/detail/${blog.id}`}>
                  <figure class="avatar">
                    <img src={blog.user.avatar} alt={blog.user.username}/>
                    <figcaption>{blog.user.username}</figcaption>
                  </figure>
                  <h3>{blog.title}<span>
                 {proxy.friendlyDate(blog.createdAt)}</span></h3>
                  <p>{blog.description}</p>
                </RouterLink>
              )
            )}

          </section>
          <section class="pagination">
            <el-pagination
              layout="prev, pager, next"
              total={total.value}
              current-page={page.value}
              onUpdate:current-page={onPageChange}
            >
            </el-pagination>
          </section>
        </div>
      </div>
    )
  }

});
