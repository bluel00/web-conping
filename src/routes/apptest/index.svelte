<script type="ts">
  import { callToast, callAlert, callShare, callConfirm, getStorage, setStorage, getVersion, copyToClipboard,
    launchTel, launchWeb, launchSystemNotification, getUser, getNotch } from '$lib/_app_communication';

  let paddingTop = 0;
  let siteUrl = '';
  const shareString = 'share({type:"contents", id:"3"})';

  async function sendConfirm() {
    const boolean = await callConfirm('오키 할래 안할래?');
    alert(boolean);
  }
  async function callGetStorage() {
    const storage = await getStorage('test');
    alert(storage);
  }
  async function callGetVersion() {
    const version = await getVersion();
    const { major, minor, build } = version ? JSON.parse(version) : { major: 0, minor: 0, build: 0 };
    alert(`${major}.${minor}.${build}`);
  }
  function sendToast() {
    callToast('토스트 전송');
  }
  function sendShare() {
    callShare('contents', '3');
  }
  function sendAlert1() {
    callAlert('안녕하세용');
  }
  function sendAlert2() {
    callAlert('메세지 입니다.', '타이틀이요');
  }
  function sendAlert3() {
    callAlert('메세지입니다.', '타이틀 입니다', '서브젝트입니당');
  }
  function callSetStorage() {
    setStorage('test', '얄리얄리 얄라셩 얄라리 얄라');
  }
  function clipboard() {
    copyToClipboard('텍스트를 복사해 주세요');
  }
  function callLaunchTel() {
    launchTel('01026280071');
  }
  function callLaunchWeb() {
    launchWeb('https://naver.com');
  }

  async function callNotch() {
    const { top } = await getNotch();
    paddingTop = top;
  }

  function goSite () {
    const host = siteUrl ? `http://${siteUrl}:3000` : 'https://gollala-frontend-web-wzsqjexeka-du.a.run.app';
    window.location.href = host;
  }
</script>

<section style="margin-top: {paddingTop}px; background-color: red">
        <button on:click={sendToast}>callToast('토스트 전송')</button>
        <button on:click={sendShare}>{shareString}</button>
        <button on:click={sendAlert1}>callAlert('안녕하세용')</button>
        <button on:click={sendAlert2}>callAlert('메세지 입니다.', '타이틀이요')</button>
        <button on:click={sendAlert3}>callAlert('메세지입니다.', '타이틀 입니다', '서브젝트입니당')</button>
        <button on:click={sendConfirm}>callConfirm('오키 할래 안할래?')</button>
        <button on:click={callGetStorage}>getStorage('test')</button>
        <button on:click={callSetStorage}>setStorage('test', '얄리얄리 얄라셩 얄라리 얄라')</button>
        <button on:click={callGetVersion}>getVersion</button>
        <button on:click={clipboard}>copyToClipboard('텍스트를 복사해 주세요')</button>
        <button on:click={callLaunchTel}>launchTel('01026280071')</button>
        <button on:click={callLaunchWeb}>launchWeb('https://naver.com')</button>
        <button on:click={launchSystemNotification}>launchSystemNotification</button>
        <button on:click={getUser}>getUser</button>
        <button on:click={callNotch}>getNotch</button>
</section>

<section style="margin-top: {paddingTop}px; background-color: red">
        <input type="text" placeholder="아이피 입력 포트는 3000" bind:value={siteUrl}> <button on:click={goSite}>연결!!</button>
</section>



<style>
    button {
        background: #ccc;
        margin: 3px;
        padding: 5px;
    }

</style>
