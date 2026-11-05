import assert from 'node:assert/strict';
import {test} from 'node:test';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const source=readFileSync(new URL('../script.js',import.meta.url),'utf8');
const start=source.indexOf('  let projectPointerIntent = null;');
const code=source.slice(start,source.indexOf('  projectCards.forEach((card) => {',start));
function setup(){
 const handlers={},opens=[];
 class Element {constructor(card=null){this.card=card;} closest(){return this.card;}}
 const card=new Element();card.card=card;card.dataset={projectGallery:'cubemind'};card.getBoundingClientRect=()=>({left:100,right:300,top:100,bottom:400,width:200,height:300});
 const gap=new Element();const outside=new Element();
 const worksViewport={scrollLeft:0,contains:e=>e!==outside};
 const window={scrollX:0,scrollY:0,setTimeout:fn=>fn()};
 vm.runInNewContext(code,{Element,projectCards:[card],worksViewport,window,document:{addEventListener:(name,fn)=>handlers[name]=fn,contains:()=>true},projectViewer:{classList:{contains:()=>false}},openProjectViewer:id=>opens.push(id)});
 const event=(overrides={})=>({isPrimary:true,pointerType:'mouse',button:0,pointerId:1,clientX:150,clientY:150,target:card,...overrides});
 return {handlers,opens,card,gap,outside,worksViewport,window,event};
}
test('small pointer drift of 20px still opens the card',()=>{const s=setup();s.handlers.pointerdown(s.event());s.handlers.pointerup(s.event({clientX:170}));assert.deepEqual(s.opens,['cubemind']);});
test('near-edge click 8px outside the card opens it',()=>{const s=setup();s.handlers.pointerdown(s.event({target:s.gap,clientX:92}));s.handlers.pointerup(s.event({target:s.gap,clientX:92}));assert.deepEqual(s.opens,['cubemind']);});
test('clicks in larger gaps and outside the viewport do not open a project',()=>{for(const o of [{clientX:80},{clientX:150,outside:true}]){const s=setup();const e=s.event({target:o.outside?s.outside:s.gap,clientX:o.clientX});s.handlers.pointerdown(e);s.handlers.pointerup(e);assert.deepEqual(s.opens,[]);}});
test('larger pointer movement and vertical or horizontal scrolling remain browsing gestures',()=>{for(const kind of ['move','page','track']){const s=setup();s.handlers.pointerdown(s.event());if(kind==='page')s.window.scrollY=30;if(kind==='track')s.worksViewport.scrollLeft=30;s.handlers.pointerup(s.event({clientX:kind==='move'?180:150}));assert.deepEqual(s.opens,[]);}});
test('cancelled pointers, project dragging, secondary buttons and other pointers do not open a card',()=>{for(const kind of ['pointercancel','dragstart','secondary','otherPointer']){const s=setup();s.handlers.pointerdown(s.event({button:kind==='secondary'?2:0}));if(s.handlers[kind])s.handlers[kind]();s.handlers.pointerup(s.event({pointerId:kind==='otherPointer'?2:1}));assert.deepEqual(s.opens,[]);}});
