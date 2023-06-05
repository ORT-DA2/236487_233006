using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IServices;
using Blog.WebApi.Filters;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace Blog.WebApi.Controllers
{
    [RoleFilter(RoleType.Admin)]
    [AuthenticationFilter]
    [Route("api/offensiveWords")]
    [ApiController]
    public class OffensiveWordController : ControllerBase
    {
        private readonly IOffensiveWordService _offensiveWordService;

        public OffensiveWordController(IOffensiveWordService wordService)
        {
            _offensiveWordService = wordService;
        }

        // Index - Get all offensive words (/api/offensiveWords)
        [AuthenticationFilter]
        [HttpGet]
        public IActionResult GetOffensiveWords([FromQuery] OffensiveWordSearchCriteria searchCriteria)
        {
            try
            {
                var result = _offensiveWordService.GetAllOffensiveWords(searchCriteria);
                return Ok(result.Select(ow => new OffensiveWordDetailModel(ow)));
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
        }

        // Show - Get specific offensive word (/api/offensiveWords/{id})
        [HttpGet("{offensiveWordId}", Name = "GetOffensiveWord")]
        public IActionResult GetOffensiveWord(int wordId)
        {
            try
            {
                var retrievedWord = _offensiveWordService.GetSpecificOffensiveWord(wordId);
                return Ok(new OffensiveWordDetailModel(retrievedWord));
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        // Create - Create new offensive word (/api/offensiveWords)
        [HttpPost]
        public IActionResult CreateOffensiveWord([FromBody] OffensiveWord newWord)
        {
            try
            {
                var createdWord = _offensiveWordService.CreateOffensiveWord(newWord);
                var offensiveWordModel = new OffensiveWordDetailModel(createdWord);
                return CreatedAtRoute("GetOffensiveWord", new { offensiveWordId = offensiveWordModel.Id }, offensiveWordModel);
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
        }

        // Update - Update specific offensive word (/api/offensiveWords/{id})
        [HttpPut("{offensiveWordId}")]
        public IActionResult UpdateOffensiveWord(int offensiveWordId, [FromBody] OffensiveWord updatedWord)
        {
            try
            {

                var retrievedWord = _offensiveWordService.UpdateOffensiveWord(offensiveWordId, updatedWord);
                var offensiveWordModel = new OffensiveWordDetailModel(retrievedWord);
                return Ok(offensiveWordModel);
            }
            catch (InvalidResourceException e)
            {
                return BadRequest(e.Message);
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }

        // Delete - Delete specific offensive word (/api/offensiveWords/{id})
        [HttpDelete("{offensiveWordId}")]
        public IActionResult DeleteOffensiveWord(int offensiveWordId)
        {
            try
            {
                _offensiveWordService.GetSpecificOffensiveWord(offensiveWordId);
                _offensiveWordService.DeleteOffensiveWord(offensiveWordId);
                return NoContent();
            }
            catch (ResourceNotFoundException e)
            {
                return NotFound(e.Message);
            }
        }
    }
}