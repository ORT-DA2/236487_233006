namespace Blog.Domain.SearchCriterias;
using System.Linq.Expressions;

public class RoleSearchCriteria
{
    public RoleType RoleType { get; set; }

    public Expression<Func<Role, bool>> Criteria()
    {
        return r => r.RoleType == RoleType;
    }
}
