import{i as l,S as f}from"./assets/vendor-8c59ed88.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&t(a)}).observe(document,{childList:!0,subtree:!0});function i(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function t(e){if(e.ep)return;e.ep=!0;const r=i(e);fetch(e.href,r)}})();function m(o,s){const i="https://pixabay.com/api/",t="45170057-222a781b727842b81c5ded16b",e=new URLSearchParams({key:t,page:s,per_page:10,q:o,image_type:"photo",orientation:"horizontal",safesearch:"true"});return fetch(`${i}?${e}`).then(r=>{if(!r.ok)throw new Error(r.status);return r.json()})}function d({webformatURL:o,largeImageURL:s,tags:i,likes:t,views:e,comments:r,downloads:a}){return`<li class="gallery">
            <a class="list" href="${s}">
              <img class="photo" src="${o}" alt="${i}" />
              <ul class="properties-list">
                <li>
                  <p class="prop">Likes</p>
                  <p class="prop-value">${t}</p>
                </li>
                <li>
                  <p class="prop">Views</p>
                  <p class="prop-value">${e}</p>
                </li>
                <li>
                  <p class="prop">Comments</p>
                  <p class="prop-value">${r}</p>
                </li>
                <li>
                  <p class="prop">Downloads</p>
                  <p class="prop-value">${a}</p>
                </li>
              </ul>
            </a>
          </li>`}function h(o){return o.map(d).join("")}const n="/goit-js-hw-12/assets/error-7a2045ea.svg",u=document.querySelector(".js-form"),c=document.querySelector(".js-gallery-list"),p=document.querySelector(".loader");u.addEventListener("submit",g);function g(o){o.preventDefault(),c.innerHTML="";const i=new FormData(u).get("search").trim();if(i==="")return l.error({iconUrl:n,title:"Error",titleColor:"#fff",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",message:"The field cannot be empty!"});p.classList.remove("hidden"),m(i).then(t=>{if(t.hits.length===0)return l.error({iconUrl:n,title:"Error",titleColor:"#fff",messageColor:"#fff",backgroundColor:"#ef4040",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"});c.innerHTML=h(t.hits),new f(".gallery a",{captionsData:"alt",captionDelay:250}).refresh()}).catch(t=>{console.log(t)}).finally(()=>{p.classList.add("hidden"),o.target.reset()})}
//# sourceMappingURL=commonHelpers.js.map
