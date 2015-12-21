class Api::ImageCommentsController < ApplicationController
# In PROGRESS
  def new

  end

  def index
    @image_comments = ImageComment.includes(:author).all.order('"created_at" ASC')
  end

  def create
    @image_comment = ImageComment.new(comment_params)

    @image_comment.author_id = current_user.id


    if @image_comment.save
      render :create
    else
      render json: @image_comment.errors.full_messages, status: 422
    end
  end

    def show
      @image_comment = ImageComment.find(params[:id])
    end

    def destroy
     @image_comment = ImageComment.find(params[:id])
     @image_comment.destroy
     render :show
    end

  private

  def comment_params
    params.require(:image_comment).permit(
      :body, :author_id, :image_id, :parent_comment_id
    )
  end
end
