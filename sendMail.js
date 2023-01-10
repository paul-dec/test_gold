import { encode, decode } from 'https://cdn.jsdelivr.net/npm/js-base64@3.7.4/base64.mjs';

export function validateFormOnSubmit(theForm) {
  var formData = new FormData(theForm);
  const companyName = formData.get('cname');
  const companyWebsite = formData.get('cwebsite');
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const desc = formData.get('desc');
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.set('Authorization', 'Basic ' + encode('9eb38a486e855f3da3c2cca20a68f10e'+":" +'f4a6ed33272118a3c9e44ed0e2cd3f94'));

  const data = JSON.stringify({
    "Messages": [{
      "From": {"Email": email, "Name": `${companyName} - ${name}`},
      "To": [{"Email": "paul.decrosse@gmail.com", "Name": "Paul"}],
      "Subject": `[GOLDSRC REQUEST] ${companyName} - ${name}`,
      "TextPart": `${email}\n${phone}\n${companyWebsite}\n${desc}`
    }]
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: data,
  };

  fetch("https://api.mailjet.com/v3.1/send", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}
