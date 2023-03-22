import request from '@/helpers/request'

interface Url {
  GET_LIST: string;
  GET_DETAIL: (blogId: number) => string;
  CREATE: string;
  UPDATE: (blogId: number) => string;
  DELETE: (blogId: number) => string;
}

const URL: Url = {
  GET_LIST: '/blog',
  GET_DETAIL: (blogId: number) => `/blog/${blogId}`,
  CREATE: '/blog',
  UPDATE: (blogId: number) => `/blog/${blogId}`,
  DELETE: (blogId: number) => `/blog/${blogId}`
}

interface GetBlogsParams {
  page: number,
  userId?: number,
  atIndex?: boolean,
}

interface CreateBlogParams {
  atIndex?: boolean,
  title: string,
  content: string,
  description: string
}

interface BlogId {
  blogId: number
}

type UpdateBlogParams = CreateBlogParams & BlogId

interface BlogsResponse {
  data: Blog[]
  msg: string
  page: number
  status: "ok" | "fail"
  total: number
  totalPage: number
}

export default {
  getBlogs({page = 1, userId, atIndex}: GetBlogsParams = {page: 1}): Promise<BlogsResponse> {
    return request(URL.GET_LIST, 'GET', {page, userId, atIndex})
  },

  getIndexBlogs({page = 1} = {page: 1}): Promise<BlogsResponse> {
    return this.getBlogs({page, atIndex: true})
  },

  getBlogsByUserId(userId: number, {page = 1, atIndex}: GetBlogsParams = {page: 1}): Promise<BlogsResponse> {
    return this.getBlogs({userId, page, atIndex})
  },

  getDetail({blogId}: BlogId) {
    return request(URL.GET_DETAIL(blogId))
  },

  updateBlog({blogId, title, content, description, atIndex}: UpdateBlogParams) {
    return request(URL.UPDATE(blogId), 'PATCH', {title, content, description, atIndex})
  },

  deleteBlog({blogId}: BlogId) {
    return request(URL.DELETE(blogId), 'DELETE')
  },

  createBlog({title = '', content = '', description = '', atIndex = false}: CreateBlogParams = {
    title: '',
    content: '',
    description: '',
    atIndex: false
  }) {
    return request(URL.CREATE, 'POST', {title, content, description, atIndex})
  }
}
