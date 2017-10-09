RSpec.feature 'サイトトップ', type: :feature do

  scenario 'root_path にアクセスする' do
    visit root_path
    expect(page).to have_title 'S3Direct'
  end
end
