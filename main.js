const dafaul_com_prof_clr = 'grey';
const comments_profile_color = {
  "Daguplo": "red"
};
let Videos =[
  {
    "owner": "Adelante",
    "profile_color": "orange",
    "caption": "Lorem ipsum dolor sit amet consectetur",
    "source": "Videos/adventures/a1.mp4",
    "likes": 199,
    "shares": 0,
    "category": "ADVENTURE",
    "comments": {
      "Alizandra": "hahaha",
      "Adelante": "Pasikat",
      "Daguplo": "Ayaw goy"
    }
  },
  {
    "owner": "Pantaleon",
    "profile_color": "red",
    "caption": "sayaw bay",
    "source": "Videos/anime/an1.mp4",
    "likes": 999,
    "shares": 0,
    "category": "ANIME",
    "comments": {
      "charl": "Hello, lord",
      "Hindiana": "Balot"
    }
  }
];




//---------------------------------------------------------------------------


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
shuffleArray(Videos);


function ccd(v){
  
  document.getElementById('video'+v+'-comments').innerHTML = formatNumber(Object.keys(Videos[v].comments).length);
    
  document.getElementById('cc'+v).innerHTML = '';
  const comments_container = document.getElementById('cc'+v);
  const comment_area = document.createElement('div');
  comment_area.setAttribute('class','comment-area');
  const cctitle = document.createElement('div');
  cctitle.setAttribute('class','cctitle');
  cctitle.innerHTML = 'Comments';
  comment_area.append(cctitle);
  const to_comment = document.createElement('div');
  const add_comment = document.createElement('div');
  to_comment.setAttribute('class','to-comment');
  add_comment.setAttribute('class','add-comment');
  add_comment.setAttribute('id','add-comment'+v);
  
  const exit_comment = document.createElement('button');
  exit_comment.setAttribute('class','exit-comment');
  exit_comment.setAttribute('onclick','comment('+v+')');
  const exit_img = document.createElement('img');
  exit_img.setAttribute('class','exit-img');
  exit_img.setAttribute('src','Icons/arrow-left-long-solid.svg');
  exit_comment.append(exit_img);

  const comment_input = document.createElement('input');
  comment_input.setAttribute('class','comment-input');
  comment_input.setAttribute('id',v);
  comment_input.setAttribute('placeholder','Add comment...');
  const comment_send = document.createElement('button');
  comment_send.setAttribute('class','comment-send');
  comment_send.setAttribute('onclick','addComment('+v+')');
  const comment_send_img = document.createElement('img');
  comment_send_img.setAttribute('src','Icons/paper-plane-solid.svg');
  add_comment.append(comment_input);
  add_comment.append(comment_send);
  comment_send.append(comment_send_img);
  comments_container.append(comment_area);
  comments_container.append(to_comment);
  to_comment.append(add_comment);

  comment_input.addEventListener('keypress', function(event){
    if (event.key === 'Enter') {
      const username = document.getElementById('usernameDisplay').textContent;
      if(!Videos[v].comments[username]){
        Videos[v].comments[username] = comment_input.value;
      }
      create_comment2Display(v);
    }
  });

  cctitle.append(exit_comment);
  for(let j=0;j<Object.keys(Videos[v].comments).length;j++){
    const comments = document.createElement('div');
    const comment_owner = document.createElement('div');
    const comment = document.createElement('div');
    const comment_name = document.createElement('span');
    const comment_text = Object.values(Videos[v].comments)[j];

    comments.setAttribute('class','comments');
    comment_owner.setAttribute('class','comment-owner');
    comment.setAttribute('class','comment');
    comment_name.setAttribute('class','comment-name');

    if(Object.keys(Videos[v].comments)[j] == document.getElementById('usernameDisplay').textContent){
      comment_owner.style.backgroundColor = window.getComputedStyle(document.getElementById('profl')).backgroundColor;
    }else if((comments_profile_color[Object.keys(Videos[v].comments)[j]])){
      comment_owner.style.backgroundColor = comments_profile_color[Object.keys(Videos[v].comments)[j]];
    }else{
      comment_owner.style.backgroundColor = dafaul_com_prof_clr;
    }

    comment_owner.innerHTML = Object.keys(Videos[v].comments)[j][0].toUpperCase();
    comment_name.innerHTML = Object.keys(Videos[v].comments)[j];

    comment_area.append(comments);
    comments.append(comment_owner);
    comment.append(comment_name);
    comment.append(comment_text);
    comments.append(comment);
  }
}

function create_comment2Display(vidSpc){
  if(!vidSpc){
    for(let v=0;v<Videos.length;v++){
      ccd(v);
    }
  }else{
    ccd(vidSpc);
  }
}



let already_liked_vids = [];

function create_video2Display(i, vid){
  const video_area = document.createElement('div');
  const video_container = document.createElement('div');

  const video_top_container = document.createElement('div');
  const video_owner_profile = document.createElement('div');
  const video_caption = document.createElement('div');
  const video_owner = document.createElement('span');

  const video_bottom_container = document.createElement('div');
  const comments_container = document.createElement('div');

  // // -----
  video_owner_profile.innerHTML = vid.owner[0];
  video_owner.innerHTML = vid.owner;
  video_caption.append(video_owner);
  video_caption.append(document.createElement('br'));
  video_caption.append(document.createElement('br'));
  video_caption.append(vid.caption);

  let heart = 'Icons/heart-solid.svg';
  if(already_liked_vids.includes(i)){
    heart = 'Icons/heart-red.svg';
  }

  const main_video = '<div class="vdcon"><video autoplay loop src="'+vid.source+'"></video></div><div class="video-buttons-container"><button onclick="like('+i+')"><div class="button-circle-bg"><img id="video'+i+'-like-img" src="'+heart+'"></div><span id="video'+i+'-likes">'+formatNumber(vid.likes)+'</span></button><button onclick="comment('+i+')"><div class="button-circle-bg"><img src="Icons/comment-solid.svg"></div><span id="video'+i+'-comments">0</span></button><button onclick="share('+i+')"><div class="button-circle-bg"><img src="Icons/share-solid.svg"></div><span id="video'+i+'-shares">'+formatNumber(vid.shares)+'</span></button><br></div>';

  // // -----

  video_area.setAttribute('class','video-area');
  video_area.setAttribute('id','va'+i);
  video_container.setAttribute('class','video-container');

  video_top_container.setAttribute('class','video-top-container');
  video_owner_profile.setAttribute('id','video-owner-profile');
  video_caption.setAttribute('id','video-caption');
  video_owner_profile.style.backgroundColor = vid.profile_color;

  video_bottom_container.setAttribute('class','video-bottom-container');
  video_bottom_container.innerHTML = main_video;
  comments_container.setAttribute('class','comments-container');
  comments_container.setAttribute('id','cc'+i);
  // // -----


  video_top_container.append(video_owner_profile);
  video_top_container.append(video_caption);

  video_container.append(video_top_container);
  video_container.append(video_bottom_container);

  video_area.append(video_container);
  video_area.append(comments_container);
  document.querySelector('main').append(video_area);
}


let shortsVideos = document.querySelectorAll("video");
let currentPlaying = null;
function display_videos(category){
  shuffleArray(Videos);
  document.querySelector('main').innerHTML = '';
  document.querySelector('main').scrollTop = 0;
  document.querySelector('main').append(document.createElement('br'));
  for(let i=0;i<Videos.length;i++){
    if(!category){
      create_video2Display(i, Videos[i]);
      ccd(i);
    }else{
      if(Videos[i].category == category){
        create_video2Display(i, Videos[i]);
        ccd(i);
      }
    }
  }
  document.querySelector('main').append(document.createElement('br'));
  shortsVideos = document.querySelectorAll("video");
  
  let vidcount = 0;
  shortsVideos.forEach(video => {
    video.pause();
    if(vidcount == 0){
      video.play();
      currentPlaying = video;
    }
    vidcount++;
    video.addEventListener('click', function(event) {
      if (video.paused) {
        video.play();
        currentPlaying = video;
      } else {
        video.pause();
        if(currentPlaying == video){
          currentPlaying = null;
        }
      }
    });
  });
}

display_videos();
document.getElementById('home-container').addEventListener('click',function(){display_videos();});



let category_opened = false;
function open_category(){
  if(!category_opened){
    document.getElementById('anime-button').removeAttribute('style');
    document.getElementById('adventure-button').removeAttribute('style');
    document.getElementById('sport-button').removeAttribute('style');
    document.getElementById('category-option').removeAttribute('style');
    category_opened = true;
  }else{
    document.getElementById('anime-button').setAttribute('style','transform: translateX(-100%);');
    document.getElementById('adventure-button').setAttribute('style','transform: translateX(-200%);');
    document.getElementById('sport-button').setAttribute('style','transform: translateX(-300%);');
    document.getElementById('category-option').setAttribute('style','box-shadow: 0 0 0 transparent;');
    category_opened = false;
  }
}

function formatNumber(num) {
  if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1) + 'b';
  }
  if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'm';
  }
  if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
  }
  return num.toString();
}

function like(vid_num){
  if(!already_liked_vids.includes(vid_num)){
    document.getElementById('video'+vid_num+'-like-img').setAttribute('src','Icons/heart-red.svg');

    const likes = document.getElementById('video'+vid_num+'-likes');
    const incNum = Videos[vid_num].likes + 1;
    likes.innerHTML = formatNumber(incNum);
    Videos[vid_num].likes = incNum;
    already_liked_vids.push(vid_num);
  }
}
let already_share_vids = [];
function share(vid_num){
  if(!already_share_vids.includes(vid_num)){
    const shares = document.getElementById('video'+vid_num+'-shares');
    const incNum = Videos[vid_num].shares + 1;
    shares.innerHTML = formatNumber(incNum);
    Videos[vid_num].shares = incNum;
    already_liked_vids.push(vid_num);
  }
}


document.getElementById('searchval').addEventListener('keypress', function(event) {
  if (event.key === 'Enter') {
    search();
  }
});


function search(){
  const search_value = document.getElementById('searchval').value.toLowerCase();
  if(search_value !== ''){
    document.querySelector('main').scrollTop = 0;
    document.querySelector('main').innerHTML = '';
    document.querySelector('main').append(document.createElement('br'));
    // ------------
    var filteredItems = Videos.filter(function(item) {
      return item.caption.toLowerCase().includes(search_value);
    });
    for(let i=0;i<filteredItems.length;i++) {
      create_video2Display(i, filteredItems[i]);
    }

    filteredItems = Videos.filter(function(item) {
      return !item.caption.toLowerCase().includes(search_value);
    });
    for(let i=0;i<filteredItems.length;i++) {
      create_video2Display(i, filteredItems[i]);
    }
    create_comment2Display();
    // ------------
    document.querySelector('main').append(document.createElement('br'));
  }
}

function comment(vid_num){
  const video_area = document.getElementById('va'+vid_num);
  const comments_container = document.getElementById('cc'+vid_num);
  if(!video_area.hasAttribute('style')){
    video_area.style.justifyContent = 'flex-start';
    comments_container.setAttribute('style','flex-grow: 1;opacity: 1;z-index: 5');
  }else{
    video_area.removeAttribute('style');
    comments_container.removeAttribute('style');
  }
}

function addComment(vid_num){
  const comment_input = document.getElementById(vid_num);
  const username = document.getElementById('usernameDisplay').textContent;
  if(!Videos[comment_input.id].comments[username]){
    Videos[comment_input.id].comments[username] = comment_input.value;
  }
  create_comment2Display(comment_input.id);
}


document.addEventListener("DOMContentLoaded", function() {
  function pauseVideoIfNotInView(video) {
    var rect = video.getBoundingClientRect();
    var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
    if (rect.bottom < 0 || rect.top > viewHeight) {
      video.pause();
      if(currentPlaying == video){
        currentPlaying = null;
      }
    } else {
      if(currentPlaying == null){
        currentPlaying = video;
        video.play();
      }
    }
  }

  function handleVideosVisibility() {
    shortsVideos.forEach(function(video) {
      pauseVideoIfNotInView(video);
    });
  }

  document.querySelector('main').addEventListener("scroll", handleVideosVisibility);
  window.addEventListener("resize", handleVideosVisibility);
});

