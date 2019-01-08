[Spotify API Documentation]: https://developer.spotify.com/documentation/web-api/
# spotify-service-rg

This is a Angular spotify service. Use this service to quickly use the most basic functions of Spotify API.


## Installation

The library is available as npm package, so all you need to do is to run the following command:

```
npm install --save spotify-service-rg
```

This command will create a record in your `package.json` file and install the package into the npm modules folder.


## Minimal Setup Example

First thing you need to do is to import the spotify-service-rg module into your component.
```
import {SpotifyServiceRgModule} from 'spotify-service-rg';
```

Then register it by adding to the list of directives of your module:
```
@NgModule({
  imports: [
    SpotifyServiceRgModule,
  ]
})
```

After this you can use the service from your components by using dependency injection
```
export class AppComponent {
  constructor(public spotifyService: SpotifyRgService){}
  }
```

To be able to connect to the Spotify API the service requires few properties that need to be configured, check [Spotify API Documentation][] for specifics.
```
this.spotifyService.setClientId("");
this.spotifyService.setScopes("user-read-private user-top-read ");
this.spotifyService.setCallBackUrl("http://localhost:4200/callback");
this.spotifyService.setToken(localStorage.getItem('spotify-token'));
```

Most of the methods require authentication which basically means you need to login to get the token.
To use the login method you need to have clientId, scopes and callBackUrl configured.
Personally I like to create a callback component that extracts the token from the response.
```
ng generate component callback
```

Short implementation example
```
export class CallbackComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    //Get token from callback url
    var token = window.location.href.split('access_token=')[1];
    //Set token to where you want to store it
    localStorage.setItem('spotify-token', token);
    //Navigate back to application
    this.router.navigate(["/home"]);
  }
}
```

## Methods available
| Method        |
| ------------- |
| getTrack()      | 
| getTracks()    | 
|getRecommendedTracks()|
| getAlbum()      | 
| getAlbums()    | 
| getAlbumsTracks() | 
| getArtist()      | 
| getArtists()    | 
| getArtistsAlbums() | 
| getArtistsTopTracks() | 
| getUsersTopTracks()    | 
| getUsersPlaylists()    | 
| createPlaylist() | 
| addTracksToPlaylist() |
|search()|



    


