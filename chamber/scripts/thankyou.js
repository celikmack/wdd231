// Get the user informaton
const userInfo = new URLSearchParams(window.location.search);
console.log(userInfo);

document.querySelector('.results').innerHTML = `
<ul>
<li><strong>Name: </strong>${userInfo.get('first-name')} ${userInfo.get('last-name')}</li>
<li><strong>Email: </strong>${userInfo.get('email')}  </li>
<li><strong>Phone Number: </strong>${userInfo.get('phone')}  </li>
<li><strong>Company Name: </strong>${userInfo.get('org-name')}  </li>
<li><strong>Submitted at: </strong>${userInfo.get('timestamp')}  </li>
`


