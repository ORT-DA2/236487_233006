using Blog.Domain;
using Blog.Domain.SearchCriterias;

namespace Blog.IServices;

public interface IOffensiveWordService
{
    List<OffensiveWord> GetAllOffensiveWords(OffensiveWordSearchCriteria searchCriteria);
    OffensiveWord GetSpecificOffensiveWord(int id);
    OffensiveWord CreateOffensiveWord(OffensiveWord word);
    OffensiveWord UpdateOffensiveWord(int id, OffensiveWord updatedWord);
    void DeleteOffensiveWord(int id);
    bool ContainsOffensiveWord(string word);
}
