export const permissions = {
  task: ["create", "edit", "delete", "view", "move"],
  column: ["create", "edit", "delete", "view", "move"],
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
      { key: "move", label: "Mover tarefas" },
    ],
  },
  {
    title: "Colunas",
    prefix: "column",
    options: [
      { key: "create", label: "Criar colunas" },
      { key: "edit", label: "Editar colunas" },
      { key: "delete", label: "Deletar colunas" },
      { key: "view", label: "Visualizar colunas" },
      { key: "move", label: "Mover colunas" },
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
