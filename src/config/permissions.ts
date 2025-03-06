export const permissions = {
  task: ["create", "edit", "delete", "view"],
  team: ["manage", "invite", "remove", "view"],
  comment: ["create", "edit", "delete", "view"],
};

export const permissionsDetail = [
  {
    title: "Tarefas",
    prefix: "task",
    options: [
      { key: "create", label: "Criar tarefas" },
      { key: "edit", label: "Editar tarefas" },
      { key: "delete", label: "Deletar tarefas" },
      { key: "view", label: "Visualizar tarefas" },
    ],
  },
  {
    title: "Equipe",
    prefix: "team",
    options: [
      { key: "manage", label: "Gerenciar equipe" },
      { key: "invite", label: "Convidar membros" },
      { key: "remove", label: "Remover membros" },
      { key: "view", label: "Visualizar equipe" },
    ],
  },
  {
    title: "Comentários",
    prefix: "comment",
    options: [
      { key: "create", label: "Criar comentários" },
      { key: "edit", label: "Editar comentários" },
      { key: "delete", label: "Deletar comentários" },
      { key: "view", label: "Visualizar comentários" },
    ],
  },
];
