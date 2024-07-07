using BookCart.Interfaces;
using BookCart.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Net.Http.Headers;

namespace BookCart.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class BookController : Controller
    {
        readonly IWebHostEnvironment _hostingEnvironment;
        readonly IBookService _bookService;
        readonly IConfiguration _config;
        readonly string coverImageFolderPath = string.Empty;

        public BookController(IConfiguration config, IWebHostEnvironment hostingEnvironment, IBookService bookService)
        {
            _config = config;
            _bookService = bookService;
            _hostingEnvironment = hostingEnvironment;
            coverImageFolderPath = Path.Combine(_hostingEnvironment.WebRootPath, "Upload");
            if (!Directory.Exists(coverImageFolderPath))
            {
                Directory.CreateDirectory(coverImageFolderPath);
            }
        }

        /// <summary>
        /// Get the list of available books
        /// </summary>
        /// <returns>List of Book</returns>
        [HttpGet]
        public async Task<List<Book>> Get()
        {
            return await Task.FromResult(_bookService.GetAllBooks()).ConfigureAwait(true);
        }

        /// <summary>
        /// Get the specific book data corresponding to the BookId
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            Book book = _bookService.GetBookData(id);
            if (book != null)
            {
                return Ok(book);
            }
            return NotFound();
        }

        /// <summary>
        /// Get the list of available categories
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("GetCategoriesList")]
        public async Task<IEnumerable<Categories>> CategoryDetails()
        {
            return await Task.FromResult(_bookService.GetCategories()).ConfigureAwait(true);
        }

        /// <summary>
        /// Get the random five books from the category of book whose BookId is supplied
        /// </summary>
        /// <param name="bookId"></param>
        /// <returns></returns>
        [HttpGet]
        [Route("GetSimilarBooks/{bookId}")]
        public async Task<List<Book>> SimilarBooks(int bookId)
        {
            return await Task.FromResult(_bookService.GetSimilarBooks(bookId)).ConfigureAwait(true);
        }

        /// <summary>
        /// Add a new book record
        /// </summary>
        /// <returns></returns>
        [HttpPost, DisableRequestSizeLimit]
        [Authorize(Policy = UserRoles.Admin)]
        public int Post()
        {
            Book book = JsonConvert.DeserializeObject<Book>(Request.Form["bookFormData"].ToString());

            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];

                if (file.Length > 0)
                {
                    string fileName = Guid.NewGuid() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(coverImageFolderPath, fileName);
                    using (var stream = new FileStream(fullPath, FileMode.Create))
                    {
                        file.CopyTo(stream);
                    }
                    book.CoverFileName = fileName;
                }
            }
            else
            {
                book.CoverFileName = _config["DefaultCoverImageFile"];
            }
            return _bookService.AddBook(book);
        }

        /// <summary>
        /// Update a particular book record
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        [Authorize(Policy = UserRoles.Admin)]
        public int Put()
        {
            Book book = JsonConvert.DeserializeObject<Book>(Request.Form["bookFormData"].ToString());
            if (Request.Form.Files.Count > 0)
            {
                var file = Request.Form.Files[0];

                if (file.Length > 0)
                {
                    string fileName = Guid.NewGuid() + ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                    string fullPath = Path.Combine(coverImageFolderPath, fileName);
                    bool isFileExists = Directory.Exists(fullPath);

                    if (!isFileExists)
                    {
                        using (var stream = new FileStream(fullPath, FileMode.Create))
                        {
                            file.CopyTo(stream);
                        }
                        book.CoverFileName = fileName;
                    }
                }
            }
            return _bookService.UpdateBook(book);
        }

        /// <summary>
        /// Delete a particular book record
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        [Authorize(Policy = UserRoles.Admin)]
        public int Delete(int id)
        {
            string coverFileName = _bookService.DeleteBook(id);
            if (coverFileName != _config["DefaultCoverImageFile"])
            {
                string fullPath = Path.Combine(coverImageFolderPath, coverFileName);
                if (System.IO.File.Exists(fullPath))
                {
                    System.IO.File.Delete(fullPath);
                }
            }
            return 1;
        }
    }
}
