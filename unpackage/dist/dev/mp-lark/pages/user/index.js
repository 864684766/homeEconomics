"use strict";const e=require("../../common/vendor.js"),i=require("../../api/index.js");if(!Array){const _=e.resolveComponent("uni-dateformat"),r=e.resolveComponent("uni-group");(_+r)()}const k=()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-dateformat/uni-dateformat.js",M=()=>"../../node-modules/@dcloudio/uni-ui/lib/uni-group/uni-group.js";Math||(k+M)();const P=e.defineComponent({__name:"index",setup(_){const r=e.useStore();e.onMounted(()=>{j()});const w=async()=>await e.uni.getProvider({service:"oauth"}),h=async o=>(console.log("provider---",o),await e.uni.login({provider:o,univerifyStyle:{fullScreen:!0}})),j=async()=>{var s;let o="";const p=await w();o=(await h((s=p.provider)==null?void 0:s[0])).code;const u=await i.getAccessToken(o),c=(await i.getOpenId(u.data.data.access_token)).data.data.open_id,n=await i.getUserInfo(c),d=await i.getTenantInfo();await i.getDepartmentInfo(n.data.data.user.department_ids[0]);const a={userinfo:n.data.data.user,tenantinfo:d.data.data.tenant};console.log("obj---",a),r.commit("user/infoChange",a)},t=e.computed(()=>r.getters["user/userInfo"]),I=o=>{switch(o){case 1:return"男";case 2:return"女";case 3:return"保密"}};return(o,p)=>{var m,u,f,c,n,d,a,s,g,v,y,b;return{a:(m=t.value.userinfo)==null?void 0:m.avatar.avatar_72,b:e.t((u=t.value.userinfo)==null?void 0:u.name),c:e.t((f=t.value.userinfo)==null?void 0:f.employee_no),d:(c=t.value.tenantinfo)==null?void 0:c.avatar.avatar_72,e:e.t((n=t.value.tenantinfo)==null?void 0:n.name),f:e.t(I((d=t.value.userinfo)==null?void 0:d.gender)),g:e.t((a=t.value.userinfo)==null?void 0:a.city),h:e.t((s=t.value.userinfo)==null?void 0:s.mobile),i:e.p({date:(g=t.value.userinfo)==null?void 0:g.join_time,format:"yyyy-MM-dd hh:mm:ss"}),j:e.t((v=t.value.userinfo)==null?void 0:v.work_station),k:e.p({title:"基础信息",top:"20"}),l:e.t((y=t.value.userinfo)!=null&&y.status.is_resigned?"是":"否"),m:e.t((b=t.value.userinfo)!=null&&b.status.is_activated?"是":"否"),n:e.p({title:"用户状态",top:"20"}),o:e.o((...l)=>o.formSubmit&&o.formSubmit(...l)),p:e.o((...l)=>o.formReset&&o.formReset(...l))}}}}),S=e._export_sfc(P,[["__file","D:/test/homeEconomics/pages/user/index.vue"]]);tt.createPage(S);
