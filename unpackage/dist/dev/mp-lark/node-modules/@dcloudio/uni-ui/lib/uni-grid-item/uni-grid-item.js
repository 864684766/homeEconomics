"use strict";const r=require("../../../../../common/vendor.js"),d={name:"UniGridItem",inject:["grid"],props:{index:{type:Number,default:0}},data(){return{column:0,showBorder:!0,square:!0,highlight:!0,left:0,top:0,openNum:2,width:0,borderColor:"#e5e5e5"}},created(){this.column=this.grid.column,this.showBorder=this.grid.showBorder,this.square=this.grid.square,this.highlight=this.grid.highlight,this.top=this.hor===0?this.grid.hor:this.hor,this.left=this.ver===0?this.grid.ver:this.ver,this.borderColor=this.grid.borderColor,this.grid.children.push(this),this.width=this.grid.width},beforeDestroy(){this.grid.children.forEach((e,h)=>{e===this&&this.grid.children.splice(h,1)})},methods:{_onClick(){this.grid.change({detail:{index:this.index}})}}};function n(e,h,t,l,i,o){return r.e({a:i.width},i.width?{b:i.showBorder?1:"",c:i.showBorder&&t.index<i.column?1:"",d:i.highlight?1:"",e:i.borderColor,f:i.borderColor,g:i.borderColor,h:r.o((...s)=>o._onClick&&o._onClick(...s)),i:r.s("width:"+i.width+";"+(i.square?"height:"+i.width:""))}:{})}const c=r._export_sfc(d,[["render",n],["__scopeId","data-v-25caaff7"],["__file","D:/test/homeEconomics/node_modules/@dcloudio/uni-ui/lib/uni-grid-item/uni-grid-item.vue"]]);tt.createComponent(c);
