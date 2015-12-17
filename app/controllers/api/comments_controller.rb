class Api::CommentsController < ApplicationController
# In PROGRESS
  def new

  end

  def index
    @comments = Comment.includes(:author).all.order('"created_at" DESC')
  end

  def create
    @comment = Comment.new(comment_params)

    @comment.author_id = current_user.id
    @comment.target_id ||= current_user.id


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
      :body, :author_id, :target_id, :image_path, :link
    )
  end
end
