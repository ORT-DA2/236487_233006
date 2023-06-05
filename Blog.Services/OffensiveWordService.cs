using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriterias;
using Blog.IDataAccess;
using Blog.IServices;

namespace Blog.Services;

public class OffensiveWordService : IOffensiveWordService
{
    private readonly IRepository<OffensiveWord> _repository;

    public OffensiveWordService(IRepository<OffensiveWord> repository)
    {
        _repository = repository;
    }

    public OffensiveWord CreateOffensiveWord(OffensiveWord word)
    {
        try
        {
            EnsureWordIsNotDuplicated(word);
            _repository.Insert(word);
            _repository.Save();
            return word;
        }
        catch (DuplicateResourceException e)
        {
            throw new DuplicateResourceException(e.Message);
        }
       
    }

    public void DeleteOffensiveWord(int id)
    {
        var word = GetSpecificOffensiveWord(id);

        _repository.Delete(word);
        _repository.Save();
    }

    public List<OffensiveWord> GetAllOffensiveWords(OffensiveWordSearchCriteria? searchCriteria)
    {
        if (searchCriteria == null)
        {
            return _repository.GetAll().ToList();
        }

        return _repository.GetAllBy(searchCriteria.Criteria()).ToList();
    }

    public OffensiveWord GetSpecificOffensiveWord(int id)
    {
        var word = _repository.GetOneBy(w => w.Id == id);

        if (word == null)
            throw new ResourceNotFoundException($"Could not find specified word {id}");

        return word;
    }

    public OffensiveWord UpdateOffensiveWord(int id, OffensiveWord updatedWord)
    {
        try
        {
            EnsureWordIsNotDuplicated(updatedWord);
            var savedWord = GetSpecificOffensiveWord(id);

            savedWord.UpdateAttributes(updatedWord);
            _repository.Update(savedWord);
            _repository.Save();

            return savedWord;
        }
        catch (DuplicateResourceException e)
        {
            throw new DuplicateResourceException(e.Message);
        }
        catch (ResourceNotFoundException e)
        {
            throw new ResourceNotFoundException(e.Message);
        }
    }

    public bool ContainsOffensiveWord(string text)
    {
        List<OffensiveWord> offensiveWords = GetAllOffensiveWords(null);

        // Split the text into individual words for comparison
        var words = text.Split(' ');

        foreach (var w in words)
        {
            if (offensiveWords.Any(o => w.Contains(o.Word)))
            {
                return true;
            }
        }

        return false;
    }

    private void EnsureWordIsNotDuplicated(OffensiveWord word)
    {
        var existingWord = _repository.GetOneBy(ow => ow.Word.Equals(word));

        if (existingWord != null)
        {
            throw new DuplicateResourceException($"An offensive word with the same content already exists.");
        }
    }
}
