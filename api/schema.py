import graphene
from graphene_django.types import DjangoObjectType
from .models import Task
from graphene_django.filter import DjangoFilterConnectionField
from graphene import relay
from graphql_relay import from_global_id

class TaskNode(DjangoObjectType):
    class Meta:
        model =Task
        filter_fields = ["id","title"]
        interfaces = (relay.Node,)

class TaskCreateMutation(relay.ClientIDMutation):
    class Input:
        title = graphene.String(required=True)
    task = graphene.Field(TaskNode)

    def mutate_and_get_payload(root, info, **input):
        task = Task(
            title=input.get('title'),
        )
        task.save()
        return TaskCreateMutation(task=task)

class TaskUpdateMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
        title = graphene.String(required=True)
    task = graphene.Field(TaskNode)

    def mutate_and_get_payload(root, info, **input):
        task = Task(
            id=from_global_id(input.get('id'))[1]
        )
        task.title = input.get('title')
        task.save()
        return TaskUpdateMutation(task=task)

class TaskDeleteMutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID(required=True)
    task = graphene.Field(TaskNode)

    def mutate_and_get_payload(root, info, **input):
        task = Task(
            id=from_global_id(input.get('id'))[1]
        )
        task.delete()
        return TaskDeleteMutation(task=None)

class Mutation(graphene.AbstractType):
    create_task = TaskCreateMutation.Field()
    update_task = TaskUpdateMutation.Field()
    delete_task = TaskDeleteMutation.Field()

class Query(graphene.ObjectType):
    task = graphene.Field(TaskNode, id=graphene.NonNull(graphene.ID))
    all_tasks = DjangoFilterConnectionField(TaskNode)

    def resolve_task(self, info, **kwargs):
        id = kwargs.get('id')
        if id is not None:
            return Task.objects.get(id=from_global_id(id)[1])

    def resolv_all_tasks(self, info, **kwargs):
        return Task.objects.all()

