import axios from 'axios'


class ApiHandler {
    constructor() {
        this.api = axios.create({
            baseURL: `http://localhost:5000/`,
        })

        this.api.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('token') || sessionStorage.getItem('token')
                if (token) {
                    config.headers = {
                        Authorization: `Bearer ${token}`,
                    }
                }

                return config

            },
            (error) => {
                throw error
            }
        )

        this.api.interceptors.response.use(
            (response) => {
                return response
            },(error) => {

                if (error.response.status === 401) {
                    sessionStorage.clear();
                    localStorage.clear();
                }

                throw error
            }
        ) 
    }
    NewAccountRequest = async (props) => {

        try {
            const { data } = await this.api.post('auth/signup', props)
            return data
        } catch (error) {
            return error.response.data
        }
    }
    LoginRequest = async (props) => {

        try {

            const { data } = await this.api.post('auth/login', props)

            return data

        } catch (error) {

            return error.response.data

        }
    }
    getConversations = async (user) => {
        try {
    
            const { data } = await this.api.get('/messages/getConversations/' + user)
    
            return data
    
        } catch (error) {
    
            throw error
    
        }
    
    }
    getMessages = async (conversationId) => {
        try {
            const { data } = await this.api.get(`/messages/getMessages/${conversationId}`)
            return data
        } catch (error) {
            throw error
        }
    
    }
    updateProfileImage = async (id ,file) => {
        try {
          const imgData = new FormData()
          imgData.append('image', file)
          const { data } = await this.api.put(`/image/profileImage/${id}`, imgData)
          console.log(id,imgData)
          return data
        } catch (error) {
          throw error.response.data
        }
      }
      updateCoverImage = async (id ,file) => {
        try {
          const imgData = new FormData()
          imgData.append('image', file)
          const { data } = await this.api.put(`/image/coverImage/${id}`, imgData)
          console.log(id,imgData)
          return data
        } catch (error) {
          throw error.response.data
        }
      }
    addFriend = async (username) => {
        try {
            const { data } = await this.api.post(`/user/requestFriend/${username}/`)
            return data
        } catch (error) {
            throw error.response.data
        }
    }
    GetProfile = async (username) => {
        try {
            const { data } = await this.api.get(`/user/findUser/${username}`)
            console.log(data)
            return data
        }catch(error){
            throw error.response.data
        }
    }
    AddPhoto = async (id,file) => {
        try {
            const imgData = new FormData()
            imgData.append('image', file)
            const { data } = await this.api.put(`/image/photos/${id}`, imgData)
            return data
        } catch (error) {
            throw error.response.data
        }
    }
    FindUser = async (query) => {
        try {
            const { data } = await this.api.get(`/user/findUsers/${query}`)
            return data
        } catch (error) {
            throw error.response.data
        }
    }
    AddComment = async (id,comment) => {
        try {
            const {data}=this.api.post(`/comment/create/${id}`,{type:'post',content:comment})
            return data
        } catch (error) {
            throw error.response.data
        }
    }
    DeletePost = async(id) => {

        const user = localStorage.getItem('user') || sessionStorage.getItem('user')
        console.log(user)
        try {
            const {data}=this.api.delete(`/post/delete/${id}`,{postedAt:user})
            return data
        } catch (error) {
            throw error.response.data
        }
    }
    CreateAPost = async({id,text,file})=>{
        const user = localStorage.getItem('user') || sessionStorage.getItem('user')
        try {
            const imgData = new FormData()
            imgData.append('image', file)
            const { data } = await this.api.post(`/post/${id}`,{text:text})
            return data
        } catch (error) {
            throw error.response.data
        }
    }
    acceptFriend = async (id) => {
        try {
            const { data } = await this.api.post(`/user/acceptFriend/${id}`)
            return data
        } catch (error) {
            throw error.response.data
        }
    }
}

export default new ApiHandler();

