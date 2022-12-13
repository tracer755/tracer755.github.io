axios.get('http://localhost:3000/random')
.then(function (response) {
    console.log(response.data);
    document.getElementById('rnd-photo').src = response.data;
})