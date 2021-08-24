const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: 'SELECT songs.title, songs.year, songs.performer, songs.genre, songs.duration FROM playlists INNER JOIN playlistsongs ON playlistsongs.playlist_id = playlists.id INNER JOIN songs ON songs.id = playlistsongs.song_id WHERE playlists.id = $1',
      values: [playlistId],
    };
    const result = await this._pool.query(query);
    if (!result.rows) {
      throw new InvariantError('Gagal Memuat lagu dari playlist');
    }
    
    return result.rows;
  }
}

module.exports = PlaylistsService;