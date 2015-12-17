class Api::CommentsController < ApplicationController
# In PROGRESS
  def new

  end

  def index
    @comments = Comment.includes(:author).all.order('"created_at" ASC')
  end

  def create
    @comment = Comment.new(comment_params)

    @comment.author_id = current_user.id


    if @comment.save
      render :create
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

    def show
      @comment = Comment.find(params[:id])
    end

    def destroy
     @comment = Comment.find(params[:id])
     @comment.destroy
     render :show
    end

  private

  def comment_params
    params.require(:comment).permit(
      :body, :author_id, :post_id, :parent_comment_id
    )
  end
end
