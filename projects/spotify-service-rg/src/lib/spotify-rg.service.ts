import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { toPromise } from 'rxjs/operator/toPromise';


@Injectable({
  providedIn: 'root'
})
export class SpotifyRgService {

  private baseUrl: string = "https://api.spotify.com/v1";
  private token: string;
  private scopes: string;
  private callBackUrl: string;
  private clientId: string;

  constructor(private readonly http: HttpClient) { }

  public login() {
    window.location.href = 'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=' + this.clientId +
      (this.scopes ? '&scope=' + encodeURIComponent(this.scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(this.callBackUrl);
  }

  //Setters for the configuration properties
  public setClientId(clientId: string) {
    this.clientId = clientId;
  }
  public setCallBackUrl(callBackUrl: string) {
    this.callBackUrl = callBackUrl;
  }
  public setScopes(scopes: string) {
    this.scopes = scopes;
  }
  public setToken(token: string) {
    this.token = token;
  }

  /** @description Returns album
  * @param artistId Albums Spotify ID.
  */
  public getAlbum(albumId: string) {
    return this.apiGet("/albums/" + albumId, null, this.getHeaders());
  }

  /** @description Returns albums
  * @param artistId Comma separated list of album ID's in a string..
  */
  public getAlbums(albumIds: string) {
    return this.apiGet("/albums/?ids=" + albumIds, null, this.getHeaders());
  }

  /** @description Returns albums tracks
  * @param artistId Albums Spotify ID.
  */
  public getAlbumsTracks(albumId: string) {
    return this.apiGet("/albums/" + albumId + "/tracks", null, this.getHeaders());
  }

  /** @description Returns artist
  * @param artistId Artists spotify ID.
  */
  public getArtist(artistId: string) {
    return this.apiGet("/artists/" + artistId, null, this.getHeaders());
  }

  /** @description Returns artists
  * @param artistId Comma separated list of artist ID's in a string.
  */
  public getArtists(artistIds: string) {
    return this.apiGet("/artists/?ids=" + artistIds, null, this.getHeaders());
  }

  /** @description Returns artists albums
  * @param artistId Artists Spotify ID.
  */
  public getArtistsAlbums(artistId: string) {
    return this.apiGet("/artists/" + artistId + "/albums", null, this.getHeaders());
  }

  /** @description Returns artists top tracks
  * @param artistId Artists Spotify ID.
  * @param countryCode Country code in 2 char Format. For example FI. Defaults to extracting country code from token.
  */
  public getArtistsTopTracks(artistId: string, countryCode?: string) {
    var countryCode = (countryCode != null && countryCode.length == 2)? countryCode: "from_token";
    return this.apiGet("/artists/" + artistId + "/top-tracks?country="+countryCode, null, this.getHeaders());
  }

  /** @description Returns users top tracks
  * @param timeRange The range of time results are returned from. Use short_term, medium_term or long_term. Defaults to long_term.
  * @param count Amount of tracks returned. Max value 50. Defaults to 50. 
  */
  public getUsersTopTracks(timeRange, count?: string): any {
    const params = {
      //set backup default values
      'time_range': timeRange == null ? 'long_term' : timeRange,
      'limit': count == null ? '50' : count
    }
    return this.apiGet("/me/top/tracks", params, this.getHeaders());
  }

  /** @description Creates a playlist 
  * @param userId Users spotify ID.
  * @param name A name for the playlist .
  * @param description A description for the playlist.
  * @param isPublic Defines if a playlist is public or private
  */
  public createPlayList(userId: number, name: string, description: string, isPublic: boolean) {
    var body = {
      "name": name,
      "description": description,
      "public": isPublic
    }
    return this.apiPost('/me/playlists?user_id=' + userId, body, this.getHeaders())
  }

  /** @description Adds tracks to playlist
  * @param playlistId Playlist ID.
  * @param trackUris Array of spotify track uris. Max 100 tracks can be added at a time.
  */
  public addTracksToPlaylist(playListId: string, trackUris: string[]) {
    var body = {
      "uris": trackUris,
    }
    return this.apiPost('/playlists/' + playListId + '/tracks', body, this.getHeaders());
  }



  private apiGet(endpoint: string, params, headers) {
    return this.http.get(this.baseUrl + endpoint, {
      params: params,
      headers: headers,
      withCredentials: false
    }).toPromise()
  }

  private apiPost(endpoint: string, data, headers) {
    return this.http.post(this.baseUrl + endpoint, data, {
      headers: headers,
    })
      .toPromise();
  }

  private getHeaders() {
    return {
      'Authorization': 'Bearer ' + this.token,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}