using Blog.Domain;

namespace Models.In;

public class RoleSearchCriteriaModel
{
    public RoleType RoleType { get; set; }

    public RoleSearchCriteriaModel ToEntity()
    {
        return new RoleSearchCriteriaModel()
        {
            RoleType = this.RoleType,
        };
    }
}
