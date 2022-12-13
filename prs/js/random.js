axios.get('https://cute-tan-bear-tie.cyclic.app/random')
.then(function (response) {
    console.log(response.data);
    document.getElementById('rnd-photo').src = response.data;
})