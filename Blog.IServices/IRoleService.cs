using Blog.Domain;
using Blog.Domain.SearchCriterias;

namespace Blog.IServices;

public interface IRoleService
{
    List<Role> GetAllRoles(RoleSearchCriteria searchCriteria);
    Role GetSpecificRole(int id);
    Role CreateRole(Role user);
    Role UpdateRole(int id, Role updatedRole);
    void DeleteRole(int id);
}
