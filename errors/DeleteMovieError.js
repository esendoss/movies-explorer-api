class DeleteMovieError extends Error {
  constructor(message) {
    super(message);
    this.errMessage = message;
    this.statusCode = 403;
  }
}

module.exports = DeleteMovieError;
