import{_ as l,d as c,S as m,o as u,c as p,a as e,j as _,w as i,v as d}from"./index-pv8ZDzUE.js";var f={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"reirei",BASE_URL:"/week7_npm_vite/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:h}=f,w={data(){return{user:{username:"",password:""}}},methods:{login(){c.post(`${h}/admin/signin`,this.user).then(t=>{const{token:s,expired:n}=t.data;document.cookie=`kawaToken=${s}; expires = ${new Date(n)}; path=/`,this.$router.push("/product")}).catch(t=>{m.fire({toast:!0,position:"center",showConfirmButton:!1,timer:1500,icon:"error",title:t.response.data.message})})}}},v={class:"container"},b={class:"row justify-content-center"},g=e("h1",{class:"h3 mb-3 mt-3 font-weight-normal"}," 請先登入 ",-1),x={class:"col-8"},E={class:"form-floating mb-3"},V=e("label",{for:"username"},"Email address",-1),k={class:"form-floating"},S=e("label",{for:"password"},"Password",-1),T=e("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1),y=e("p",{class:"mt-5 mb-3 text-muted"}," © 2021~∞ - 六角學院 ",-1);function B(t,s,n,D,r,a){return u(),p("div",v,[e("div",b,[g,e("div",x,[e("form",{id:"form",class:"form-signin",onSubmit:s[2]||(s[2]=_((...o)=>a.login&&a.login(...o),["prevent"]))},[e("div",E,[i(e("input",{"onUpdate:modelValue":s[0]||(s[0]=o=>r.user.username=o),type:"email",class:"form-control",id:"username",placeholder:"name@example.com",required:"",autofocus:""},null,512),[[d,r.user.username]]),V]),e("div",k,[i(e("input",{"onUpdate:modelValue":s[1]||(s[1]=o=>r.user.password=o),type:"password",class:"form-control",id:"password",placeholder:"Password",required:""},null,512),[[d,r.user.password]]),S]),T],32)])]),y])}const U=l(w,[["render",B]]);export{U as default};
