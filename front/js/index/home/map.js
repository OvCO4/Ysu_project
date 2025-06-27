let naverMap = null;
// ─────────── initNaverMap: 네이버 지도 초기화 ───────────
function initNaverMap() {
  if (typeof naver === 'undefined' || !naver.maps) {
    console.error('네이버 지도 API가 로드되지 않았습니다.');
    showErrorFallback('naverMap', '지도를 불러올 수 없습니다');
    return;
  }

  const mapContainer = document.getElementById('naverMap');
  if (!mapContainer) return;

  try {
    const yeonsung = new naver.maps.LatLng(37.39661657434427, 126.90772437800818);
    const mapOptions = {
      center: yeonsung,
      zoom: 16,
      minZoom: 14,
      maxZoom: 19,
      zoomControl: false,
      logoControl: false,
      mapDataControl: false,
      scaleControl: false,
    };
    naverMap = new naver.maps.Map(mapContainer, mapOptions);
  } catch (error) {
    console.error('지도 초기화 오류:', error);
    showErrorFallback('naverMap', '지도를 불러올 수 없습니다');
  }
}

