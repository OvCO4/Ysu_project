// // community.js
// document.addEventListener('DOMContentLoaded', () => {
//   new App().initialize();
// });

// // 1. 데이터 관리 모듈
// class DataManager {
//   static async getPosts() {
//     try {
//       const res = await fetch('/api/community/posts');
//       if (!res.ok) throw new Error('게시글 조회 실패');
//       return await res.json();
//     } catch (err) {
//       console.error('게시글 조회 오류:', err);
//       return [];
//     }
//   }

//   static async savePost(newPost) {
//     const res = await fetch('/api/community/posts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(newPost),
//     });
//     if (!res.ok) {
//       const err = await res.json();
//       throw new Error(err.error || '게시글 저장 실패');
//     }
//     // 저장 후 목록 다시 불러오기
//     return await this.getPosts();
//   }
// }

// // 2. 렌더링 모듈
// class Renderer {
//   constructor(postListElement) {
//     this.postList = postListElement;
//   }

//   clear() {
//     this.postList.innerHTML = '';
//   }

//   renderPosts(posts) {
//     this.clear();
//     if (!posts || posts.length === 0) {
//       this.postList.innerHTML = '<div style="color:#888;">아직 게시글이 없습니다.</div>';
//       return;
//     }
//     posts.forEach(post => {
//       this.postList.appendChild(this.createPostElement(post));
//     });
//   }

//   createPostElement(post) {
//     const element = document.createElement('div');
//     element.className = 'post-item';
//     element.innerHTML = `
//       <h3>${this.escape(post.postTitle)}</h3>
//       <p>${this.escape(post.postContent)}</p>
//       <small>
//         작성: ${new Date(post.created_at).toLocaleString()}
//         ${post.updated_at && post.updated_at !== post.created_at ? 
//           `<br>수정: ${new Date(post.updated_at).toLocaleString()}` : ''}
//       </small>
//     `;
//     return element;
//   }

//   escape(str) {
//     return String(str)
//       .replace(/&/g, "&amp;")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;")
//       .replace(/"/g, "&quot;")
//       .replace(/'/g, "&#39;");
//   }
// }

// // 3. 이벤트 핸들러 모듈
// class EventHandler {
//   constructor(formElement, callback) {
//     this.form = formElement;
//     this.callback = callback;
//     this.bindEvents();
//   }

//   bindEvents() {
//     if (!this.form) {
//       alert('폼 요소를 찾을 수 없습니다.');
//       return;
//     }
//     this.form.addEventListener('submit', this.handleSubmit.bind(this));
//   }

//   async handleSubmit(e) {
//     e.preventDefault();
//     const formData = new FormData(this.form);
//     const postTitle = formData.get('postTitle')?.trim();
//     const postContent = formData.get('postContent')?.trim();

//     // 클라이언트 유효성 검사
//     if (!postTitle) {
//       alert('제목을 입력해주세요.');
//       return;
//     }
//     if (!postContent) {
//       alert('내용을 입력해주세요.');
//       return;
//     }
//     if (postTitle.length > 40) {
//       alert('제목은 40자 이내로 입력해주세요.');
//       return;
//     }
//     if (postContent.length > 500) {
//       alert('내용은 500자 이내로 입력해주세요.');
//       return;
//     }

//     try {
//       await this.callback({ postTitle, postContent });
//       this.form.reset();
//       alert('게시글이 등록되었습니다!');
//     } catch (err) {
//       alert(err.message || '게시글 등록 실패');
//     }
//   }
// }

// // 4. 메인 애플리케이션
// class App {
//   initialize() {
//     const postListEl = document.getElementById('livePosts');
//     const formEl = document.getElementById('writePostForm');

//     // 요소 존재 확인
//     if (!postListEl) {
//       alert('게시글 목록 요소(livePosts)가 존재하지 않습니다.');
//       return;
//     }
//     if (!formEl) {
//       alert('게시글 작성 폼(writePostForm)이 존재하지 않습니다.');
//       return;
//     }

//     this.renderer = new Renderer(postListEl);
//     this.eventHandler = new EventHandler(formEl, this.handleFormSubmit.bind(this));
//     this.refreshPosts();
//   }

//   async handleFormSubmit(newPost) {
//     const updatedPosts = await DataManager.savePost(newPost);
//     this.renderer.renderPosts(updatedPosts);
//   }

//   async refreshPosts() {
//     try {
//       const posts = await DataManager.getPosts();
//       this.renderer.renderPosts(posts);
//     } catch (err) {
//       console.error('게시글 로드 실패:', err);
//       this.renderer.renderPosts([]);
//     }
//   }
// }
