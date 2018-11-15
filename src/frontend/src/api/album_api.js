export default {
    upload_albums(data, callback) {
        fetch('http://localhost:4000/api/albums/',{
            method: 'Post', // or 'PUT'
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => callback(response))
    }
}