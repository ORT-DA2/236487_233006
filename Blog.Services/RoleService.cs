using Blog.Domain;
using Blog.Domain.Exceptions;
using Blog.Domain.SearchCriteria;
using Blog.IDataAccess;
using Blog.IServices;

namespace Blog.Services;

public class RoleService : IRoleService
{
    private readonly IRepository<Role> _repository;

    public RoleService(IRepository<Role> repository)
    {
        _repository = repository;
    }


    public List<Role> GetAllRoles(RoleSearchCriteria searchCriteria)
    {
        return _repository.GetAllBy(searchCriteria.Criteria()).ToList();
    }

    public Role GetSpecificRole(int id)
    {
        var roleSaved = _repository.GetOneBy(r => r.Id == id);

        if (roleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified Role {id}");

        return roleSaved;
    }

    public Role CreateRole(Role role)
    {
        //Role.ValidOrFail();
        _repository.Insert(role);
        _repository.Save();
        return role;
    }

    public Role UpdateRole(int id, Role updatedRole)
    {
        //updatedRole.ValidOrFail();
        var roleSaved = _repository.GetOneBy(r => r.Id == id);

        if (roleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified Role {id}");

        roleSaved.UpdateAttributes(updatedRole);
        _repository.Update(roleSaved);
        _repository.Save();

        return roleSaved;
    }

    public void DeleteRole(int id)
    {
        var roleSaved = _repository.GetOneBy(r => r.Id == id);

        if (roleSaved == null)
            throw new ResourceNotFoundException($"Could not find specified Role {id}");

        _repository.Delete(roleSaved);
        _repository.Save();
    }
}



